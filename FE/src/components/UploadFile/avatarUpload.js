export const imageUpload = async (images) => {
    let imgArr=[] ;
    for(const item of images){
        const formData = new FormData()
        formData.append("file", item)

        formData.append("upload_preset", "yqfvtheh")
        formData.append("cloud_name", "dqz5udx7r")

        const res = await fetch("https://api.cloudinary.com/v1_1/dqz5udx7r/upload", {
            method: "POST",
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin' ,
            body: formData
        }).catch(function (erro) {
            console.log('upload Cloudiary',  erro.message);
        });

        const data = await res.json()
        imgArr.push({public_id: data.public_id, url: data.secure_url})
        // imgArr= data.secure_url
    }
    return imgArr;
}