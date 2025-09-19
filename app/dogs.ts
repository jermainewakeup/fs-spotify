export async function dogImage(){
    try{
        const response=await fetch("https://dog.ceo/api/breeds/image/random")
        const posts = await response.json()

        return(posts.message)
    }
    catch(e){
        alert(e)
    }
}