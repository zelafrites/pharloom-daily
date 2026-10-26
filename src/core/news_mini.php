<?php

include('sec.php');

$conn = mysqli_connect($host, $user, $pass, $db);
$sql = 'SELECT * FROM news';

$result = $conn->query($sql)

?>

<section id="news_container">

<?php 

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo '
        <div class="news">
            <img src="/sbesite_pharloom/res/images/news/'.$row["nimg"].'.png" alt="'.$row["nimg_alt"].'" class="news_img">
            <div class="news_text">
                <h4>'.$row["ntitle"].'</h4>
                <hr>
                <p>'.$row["ndesc_short"].'</p>
                <button>Learn More</button>
            </div>
        </div>
        ';
    }
}

?>

</section>