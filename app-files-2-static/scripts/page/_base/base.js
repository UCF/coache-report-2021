/**/

$("document").ready(function() {

  /* --- --- */
  // make #body visible.. after one second
  // ..because it is hidden from CSS file
  setTimeout(function() {
      $("body").css({"visibility": "visible"})
  }, 100);


  /* --- User Agent --- */
  if ((navigator.userAgent).toLowerCase().indexOf('chrome') < 0) {
    $("body").prepend(`
        <div id='warningBrowser' class='warning'>
          <i class='material-icons' style='font-size:18px;'>warning</i>&ensp; 
          <span class='text'>
            This application is optimized for Chrome browser. For best experience, please use Chrome.
          </span>
        </div>
    `);
  }


  /* --- Modal --- */

  // ..
  function handleOpenModalForProjectLinks(opener, requestData, subContent) {
    // ..
    let resource_link = opener.attr('data-resource-link');
    let request_url = `/api/${resource_link}/`;
    // ..
    fetch(request_url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify(requestData)
    })
      .then(response => response.json())
      .then(data => {
        if (subContent.listType === 'group') {
          data.sort.reverse();
        }
        let comp = $(
          `<div class="comp comp_g11 ${subContent.listType}">
            <div class="head">
              <h3><span>${subContent.heading}</span></h3>
            </div>
            <div class="body"><ul></ul></div>
          </div>`
        );
        // ..
        for (let project_id of data.sort) {
          // ..
          let period = data.tree[project_id]['period'];
          let group_name = data.tree[project_id]['group_name'];
          let group_urldn = data.tree[project_id]['group_urldn'];
          let target_path = `/${group_urldn}-${period}/`;
          if (window.location.pathname !== '/') {
            // ..replace current project point with target project point
            let current_path = window.location.pathname.split('/');
            current_path = current_path.filter(point => point !== '');
            current_path[0] = `${group_urldn}-${period}`  // replace
            target_path = `/${current_path.join('/')}/`;
          }
          let listValue = subContent.listType === 'period' ? group_name : period;
          comp.find('.body ul')
            .append(
              `<li>
                <a href="${target_path}">
                  <span>${listValue}</span>
                </a>
              </li>`
            );
        }
        // ..
        $('#modal div.content > div.body').append(comp);
      })
      .catch(error => {
        console.error('Error: ', error)
      });
  }

  // ..
  $('a.modal').click(function() {
    // ..clear all elements from #modal container
    $('#modal div.content > div.body').empty();
    // ..display modal
    $('#modal').css({'display': 'flex'});
  });

  // ..
  $('#modal .close').click(function () {
      $('#modal').css({'display': 'none'});
  });

  // ..
  $('a.modal.api.period-projects').click(function() {
    let requestData = {
        period: $(this).attr('data-request-period'),
    }
    let subContent = {
      heading: `${$(this).attr('data-text')} Projects`,
      intro: ``,
      listType: 'period',
    }
    handleOpenModalForProjectLinks($(this), requestData, subContent);
  });

  // ..
  $('a.modal.api.group-projects').click(function() {
    let requestData = {
        group_urldn: $(this).attr('data-request-group-urldn'),
    }
    let subContent = {
      heading: `${$(this).attr('data-text')} <br/><span>All Projects</span>`,
      intro: ``,
      listType: 'group',
    }
    handleOpenModalForProjectLinks($(this), requestData, subContent);
  });

});



