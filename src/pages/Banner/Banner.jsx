import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import BannerCard from "./BannerCard";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const Banner = () => {
  const [biodata, setBiodata] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic.get(`/banner/biodatas?dataType=premium`).then((res) => setBiodata(res?.data));
  }, [axiosPublic]);
  return (
    <Grid sx={{ mt: "10px", mb: "10px" }}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {biodata.slice(0, 6).map((item) => (
          <SwiperSlide key={item.biodataId}>
            <Grid sx={{width:'100%',textAlign:'center',margin:'auto',height:'400px'}}>
              <BannerCard item={item} />
            </Grid>
          </SwiperSlide>
        ))}
      </Swiper>
    </Grid>
  );
};

export default Banner;
