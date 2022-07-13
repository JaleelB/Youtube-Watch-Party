export default async function useYoutubeUrlGetId(url){

  let videoID = '';
  url = await url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

  if(url[2] !== undefined) {
        videoID = url[2].split(/[^0-9a-z_\-]/i);
        videoID = videoID[0];
  }else {
    videoID = url;
  }
    return {videoID};

}