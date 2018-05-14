// While Confrim Button is clicked
$("#btnUploadImg").click(function() {
    const link = document.getElementById('imgOfPuppy');
    const client = filestack.init('AYIEV06KGT6yp68IaZPzVz');
    client.pick({
        accept:'image/*',
        maxFiles:1,
        imageDim:[450,450]
    }).then(function(result) {
        const fileUrl = result.filesUploaded[0].url;
        link.href=fileUrl;
        link.src=fileUrl;
    });
});
