@php   
$attendance = json_decode($attendance);
@endphp
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Attendance Report of {{ $employee->name }}</title>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        h1 {
            color: #333;
            text-align: center;
        }

        h3 {
            color: #666;
            text-align: center;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: #f2f2f2;
        }

        .late {
            color: red;
        }

        .present {
            color: green;
        }
    </style>
</head>

<body>
    <h1>Attendance Report</h1>
    <h3>Employee Name: {{ $employee->name }}</h3>
    <table id="attendanceTable" class="display dataTable">
        <thead>
            <tr>
                <th>Employee ID</th>
                <th>Date</th>
                <th>Time In</th>
                <th>Time Out</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach($attendance as $key=>$att)
            <tr>
                <td>{{ $key+1 }}</td>
                <td>{{ date('d F Y',strtotime($att->created_at)) }}</td>
                <td>{{ date('h:i A', strtotime($att->check_in)) }}</td>
                <td>{{ date('h:i A', strtotime($att->check_out)) }}</td>
                <td class="{{ $att->late ? 'late' : 'present' }}">{{ $att->late ? 'Late' : 'Present' }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.6.2/js/dataTables.buttons.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.6.2/js/buttons.flash.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.6.2/js/buttons.html5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.6.2/js/buttons.print.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.6.2/js/buttons.colVis.min.js"></script>
    
    <script>
        $(document).ready(function() {
            $('#attendanceTable').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ]
            });
        });
    </script>

</body>

</html>