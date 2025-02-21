<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>{{ $title }}</title>
    <style>
        body {
            font-family: sans-serif;
        }

        .title {
            font-size: 20px;
            font-weight: bold;
            text-align: center;
        }

        .content {
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="title">{{ $title }}</div>
    <p>Tanggal: {{ $date }}</p>
    <div class="content">{{ $content }}</div>
</body>

</html>
