function uploadimage(){
        const link = document.getElementById('imgOfPuppy');
        const client = filestack.init('Ac3EdiggQlOxJvyyxsfTmz');
        client.pick({
        accept:'image/*',
        maxFiles:1,
        imageDim:[400,300]
        }).then(function(result) {
  const fileUrl = result.filesUploaded[0].url;
  link.href=fileUrl;
  link.src=fileUrl;
});
}
