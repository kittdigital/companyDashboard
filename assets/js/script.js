/*$.ajaxSetup({
  cache:false
});*/

//location.reload(true);

/*$(document).ready(function () {
$('#dtBasicExample').DataTable({"ordering": true});
$('.dataTables_length').addClass('bs-select');
});*/

//eraseCache();

var today = new Date();
var yyyy = today.getFullYear();
var mm = String(today.getMonth() + 1).padStart(2, '0');
var dd = String(today.getDate()).padStart(2, '0');
var currentDate = yyyy + '-' + mm + '-' + dd;
var monthStart = yyyy + '-' + mm + '-01';


function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById('myTable2');
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};




// Daily Data
getJSON('https://app.ngageapp.com/new_backend/app_monitor/Reports/crm/CRM_Sales_Order_ReportByDate.php?fromDate=' + currentDate + '&toDate=' + currentDate,
function(err, data) {
	
	var currentScore = 0;
	var salesTableHTML = '<table class="sortable table striped"><tr><th>Associate</th><th>Revenue</th></tr>';
	var associatesArray = data.reduce(function (a, d) {
		if (a.indexOf(d.Associate) === -1) {
			a.push(d.Associate)
		}
		return a;
	},[]);


	for (i = 0; i < data.length; i++) {
		currentScore += parseFloat(data[i].GrossTotalAmount);
		document.getElementById('currentScore').textContent = '£' + currentScore.toFixed(2);
	}

	document.getElementById('orders').textContent = data.length;

	
	document.getElementById('aovToday').textContent = '£' +(currentScore / data.length).toFixed(2);
	
	
	for (b = 0; b < associatesArray.length; b++) {
		salesTableHTML += '<tr><td>' + associatesArray[b] + '</td>'
		var byAssociate = data.filter(function (entry) {
			
			return entry.Associate === associatesArray[b];
		
		});
		
		var associatePound = 0;
			
		for (d = 0; d < byAssociate.length; d++) {
			associatePound += parseFloat(byAssociate[d]['GrossTotalAmount']);
		}
		
		salesTableHTML += '<td>' + Number(associatePound.toFixed(2)) + '</td>' 
		
	}
	
	document.getElementById('todayRevenueByAssociate').innerHTML = salesTableHTML;
	
	
	if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
    console.log('JSON length: ' + data.length);
  }
});




// Monthly Data
getJSON('https://app.ngageapp.com/new_backend/app_monitor/Reports/crm/CRM_Sales_Order_ReportByDate.php?fromDate=' + monthStart + '&toDate=' + currentDate,
function(err, data) {
	
	var currentScore = 0;
	var salesTableHTML = '<table class="sortable table striped"><tr><th>Associate</th><th>Revenue</th></tr>';
	
	var associatesArray = data.reduce(function (a, d) {
		if (a.indexOf(d.Associate) === -1) {
			a.push(d.Associate)
		}
		return a;
	},[]);



	for (i = 0; i < data.length; i++) {
		currentScore += parseFloat(data[i].GrossTotalAmount);
		document.getElementById('scoreTillDate').textContent = '£' + currentScore.toFixed(2);
		for (j = 0; j < data.length; j++) {

	};
		
	};

	document.getElementById('ordersTillDate').textContent = data.length;
    
    document.getElementById('aovTillDate').textContent = '£' +(currentScore / data.length).toFixed(2);
	
	for (b = 0; b < associatesArray.length; b++) {
		salesTableHTML += '<tr><td>' + associatesArray[b] + '</td>'
		var byAssociate = data.filter(function (entry) {
			
			return entry.Associate === associatesArray[b];
		
		});
		
		var associatePound = 0;
			
		for (d = 0; d < byAssociate.length; d++) {
			associatePound += parseFloat(byAssociate[d]['GrossTotalAmount']);
		}
		
		salesTableHTML += '<td>£' + associatePound.toFixed(2) + '</td>' 
		
	}
	
	salesTableHTML += '<td></td></tr>'
	
	document.getElementById('revenueByAssociate').innerHTML = salesTableHTML;

	
	
	if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
    console.log('JSON length: ' + data.length);
  }
});



function eraseCache(){
  window.location = window.location.href+'?eraseCache=true';
}







