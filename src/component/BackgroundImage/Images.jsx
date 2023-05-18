
import styles from './Images.module.css';

const Images = ({ handleSelectImage }) => {

const images = [
    {
        id : 1 ,
        img : "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg"
    },
    {
        id : 2 ,
        img : "https://cdn.pixabay.com/photo/2017/08/07/22/10/lake-2608425_960_720.jpg"
    },
    {
        id : 3 ,
        img : "https://cdn.pixabay.com/photo/2018/04/28/18/55/marguerite-3357989_960_720.jpg"
    },
    {
        id : 4 ,
        img : "https://cdn.pixabay.com/photo/2023/01/29/21/18/lake-7754160_960_720.jpg"
    },
    {
        id : 5 ,
        img : 'https://cdn.pixabay.com/photo/2017/07/22/00/16/sunset-2527534_960_720.jpg'
    },
    {
        id : 6 ,
        img : "https://cdn.pixabay.com/photo/2018/09/15/16/25/sunset-3679736_960_720.jpg"
    },
    {
        id : 7 ,
        img : 'https://cdn.pixabay.com/photo/2023/05/13/16/40/landscape-7990899_960_720.jpg'
    },
    {
        id : 8 ,
        img : 'https://wallpaperset.com/w/full/0/f/9/416782.jpg'
    },
    {
        id : 9 ,
        img : 'https://cdn.pixabay.com/photo/2017/11/05/12/35/trees-2920264_960_720.jpg'
    },
    {
        id : 10 ,
        img : 'https://cdn.pixabay.com/photo/2020/05/24/02/35/grass-5212125_960_720.jpg'
    },
    {
        id : 11 ,
        img : 'https://cdn.pixabay.com/photo/2022/10/16/13/17/road-7525091_960_720.jpg'
    },
    {
        id : 12 ,
        img : 'https://wallpaperset.com/w/full/c/1/b/416786.jpg'
    }
]

const handleImageClick = (image) => {
    handleSelectImage(image);
  };
   
  return (
    

    <div className={styles.images}>
      {images.map((image) => (
        <div
          key={image.id}
          className={styles.img} 
          onClick={() => handleImageClick(image)}
        >
          <img src={image.img} alt="images" />
        </div>
      ))}
    </div>
  );
};

export default Images;
