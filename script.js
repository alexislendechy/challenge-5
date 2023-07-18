$(document).ready(function() {
  //Get current date and display it in the header
  var currentDate = dayjs().format('MMMM D, YYYY');
  //Here curret date is displayed
  $('.display-3').after('<p class="lead">' + currentDate + '</p>');

  var workingHours = [
    { hour: '9AM', id: 'hour-9' },
    { hour: '10AM', id: 'hour-10' },
    { hour: '11AM', id: 'hour-11' },
    { hour: '12PM', id: 'hour-12' },
    { hour: '1PM', id: 'hour-13' },
    { hour: '2PM', id: 'hour-14' },
    { hour: '3PM', id: 'hour-15' },
    { hour: '4PM', id: 'hour-16' },
    { hour: '5PM', id: 'hour-17' }
  ];

  var calendar = $('#calendar');

  //Calendar for each hour
  for (var i = 0; i < workingHours.length; i++) {
    var hour = workingHours[i].hour;
    var id = workingHours[i].id;

    var timeBlock = $('<div>').addClass('row time-block').attr('id', id);
    var hourElement = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(hour);
    var textareaElement = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', '3');
    var saveButton = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
    var saveIcon = $('<i>').addClass('fas fa-save').attr('aria-hidden', 'true');

    saveButton.append(saveIcon);
    timeBlock.append(hourElement);
    timeBlock.append(textareaElement);
    timeBlock.append(saveButton);
    calendar.append(timeBlock);
  }

  // Load saved events from localStorage
  loadEvents();

  // Save events when the save button is clicked
  $('.saveBtn').on('click', function() {
    var eventElement = $(this).siblings('.description');
    var event = eventElement.val();
    var hourBlock = $(this).parent('.time-block');
    var hourId = hourBlock.attr('id');

    localStorage.setItem(hourId, event);
    eventElement.addClass('saved');
    setTimeout(function() {
      eventElement.removeClass('saved');
    }, 1000);
  });

  // Here saved events from localStorage are loaded
  function loadEvents() {
    for (var i = 0; i < workingHours.length; i++) {
      var hourId = workingHours[i].id;
      var event = localStorage.getItem(hourId);

      if (event !== null) {
        $('#' + hourId + ' .description').val(event);
      }
    }
  }

  // Update the time-block colors according to the current hour
  function updateTimeBlocks() {
    var currentHour = dayjs().format('H');

    $('.time-block').each(function() {
      var hourId = $(this).attr('id');
      var hour = parseInt(hourId.split('-')[1]);

      if (hour < currentHour) {
        $(this).removeClass('present future').addClass('past');
      } else if (hour == currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  // Update time-block colors every minute
  setInterval(updateTimeBlocks, 60000);

  // Initial time-block color update
  updateTimeBlocks();
});
