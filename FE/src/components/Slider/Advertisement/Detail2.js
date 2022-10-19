import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: whitesmoke;
  position: relative;
  border-radius: 10px;
  overflow: auto;
`;

const Head = styled.div`
  position: relative;
  display: flex;
  height: 310px;
  padding: 2rem;
  background: linear-gradient(transparent 0, rgba(0, 0, 0, 0.4) 100%);
`;
const Navbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Image = styled.img`
  width: 269px;
  height: 252px;
  box-shadow: 0 4px 60px rgb(0 0 0 / 50%);
`;
const PlaylistInfo = styled.div`
  margin-left: 20px;
  flex: 1;
`;
const PlaylistName = styled.h1`
  font-size: 70px;
`;
const PlaylistTitle = styled.h1``;
const PlaylistAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Body = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  padding: 2rem;
  color: #3b3b3b;
  background: linear-gradient(transparent 0, rgba(0, 0, 0, 0.4) 100%);
`;
const BodyContent = styled.p`
  width: 66%;
  position: relative;
  display: flex;
  height: 100%;
  padding: 2rem;
  color: white;
  background: linear-gradient(transparent 0, rgba(0, 0, 0, 0.4) 100%);
`;
const BodyTitle = styled.p`
  width: 31%;
  position: relative;
  display: flex;
  height: 80%;
  margin-left: 1rem;
  padding: 2rem;
  color: white;
  background: linear-gradient(transparent 0, rgba(0, 0, 0, 0.4) 100%);
`
const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.5) 0, rgba(0, 0, 0, 0.7) 100%);
`;



const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p className="text">
            {isReadMore ? text.slice(0, 150) : text}
            <span onClick={toggleReadMore}  className="read-or-hide" style={{color:"blueviolet"}}>
        {isReadMore ? "...Xem thêm": "...Ẩn bớt"}
      </span>
        </p>
    );
};
const ReadMore2 = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <p className="text">
            {isReadMore ? text.slice(0, 500) : text}
        <span onClick={toggleReadMore} className="read-or-hide" style={{color:"blueviolet"}}>
        {isReadMore ? "...Xem thêm" : " ...Ẩn bớt"}
      </span>
        </p>
    );
};
const DetailSliderGao = () => {

    return (
        <Container>
            <Head>

                <Navbar>
                    <Image src="https://photo-zmp3.zmdcdn.me/banner/2/5/f/f/25ff09320e00b735a2ef29ff44cc6e1c.jpg"/>
                    <PlaylistInfo>
                        <PlaylistTitle>Yêu chị</PlaylistTitle>
                        <PlaylistName>Trung Tự ft Gao Thom</PlaylistName>
                    </PlaylistInfo>
                </Navbar>

            </Head>
            <Wrapper>
                <Body>
                    <BodyContent>
                        <div className="container">
                            <p>
                                <ReadMore2>
                                    Tuổi trẻ nhiệt huyết, sự thành công vang dội của Ưng Hoàng Phúc, từ khi còn là cậu ca sĩ nhỏ người với cái tên Ốc Tiêu, cho đến ngày trở thành một hiện tượng âm nhạc tới mức ở khắp mọi miền trên đất nước, không ai là không thuộc từng bài hát của anh.

                                    Nhưng cuộc đời luôn có quá nhiều những bất ngờ, trên con đường sự nghiệp vốn đang chỉ đầy hoa hồng ấy, bỗng một ngày chất đầy những khó khăn. Kể từ đó, có một Ưng Hoàng Phúc rất khác xuất hiện, một Ưng Hoàng Phúc mà bạn phải thực sự CHẠM để hiểu rõ. Đằng sau những bài báo, những mỹ từ tô vẽ hay cả những câu chuyện thị phi là rất nhiều những câu chuyện cần được CHẠM để thấu tỏ. Tất cả những cái CHẠM sâu lắng ấy, đều được Liêu Hà Trinh chắp bút vô cùng mộc mạc, chân thành qua lời kể của Ưng Hoàng Phúc trong cuốn sách viết về anh - cuốn sách mang tên CHẠM.

                                    Ở CHẠM, ta không chỉ bắt gặp cậu nhóc Quốc Thanh tinh nghịch, lắm trò. Không chỉ bắt gặp “thằng” Ốc Tiêu với niềm đam mê ca hát mãnh liệt và mong muốn chạm đến đỉnh hào quang nơi ánh đèn sân khấu lấp lánh sắc màu… Ta còn bắt gặp một Ưng Hoàng Phúc ngã xuống từ đỉnh cao của vinh quang, quay về con số 0 tròn trĩnh vì chống chọi với những cơn đau bệnh tật, hay một Ưng Hoàng Phúc trưởng thành, điềm đạm, và cả một Ưng Hoàng Phúc hết lòng vì những người anh yêu và những người đã tin tưởng, ủng hộ anh đến cùng.

                                    Cuốn sách với sự chân thành và tận tụy của Ưng Hoàng Phúc qua ngòi bút của Liêu Hà Trinh mang đến thông điệp mạnh mẽ rằng: chỉ khi ta không ngừng cố gắng, nỗ lực chiến thắng những điều tưởng chừng đã được số phận an bài, ta sẽ CHẠM được tới ước mơ, hạnh phúc mà mình chờ mong.

                                    Khép lại CHẠM, chính ta cũng được trở về với vùng ký ức đầy sống động của một thuở thiếu thời, những chúng ta của một thời yêu đương vụng dại nhưng đầy nhung nhớ ấy.

                                </ReadMore2>
                            </p>
                        </div>
                    </BodyContent>
                    <BodyTitle>
                        <div className="container">
                            <p>
                                <ReadMore>
                                    Ưng Hoàng Phúc tên thật là Nguyễn Quốc Thanh[1] (sinh ngày 18 tháng 8 năm 1981 tại xã Kiến An, Chợ Mới, An Giang)
                                    là một nam ca sĩ, diễn viên, nhà sản xuất điện ảnh, vũ công người Việt Nam. Với doanh số khoảng 250 nghìn đĩa được tiêu thụ,
                                    anh là một trong những nghệ sĩ V-pop bán đĩa chạy nhất. Anh từng là ca sĩ độc quyền của công ty Thế giới Giải Trí (WePro).
                                    Ưng Hoàng Phúc cũng từng là thành viên của nhóm 1088, một ban nhạc nam nổi tiếng trong dòng nhạc trẻ Việt Nam, dưới sự quản lý
                                    của công ty Cánh Chim Việt. Sau khi Nhóm nhạc 1088 tan rã, Ưng Hoàng Phúc bắt đầu sự nghiệp solo và nhanh chóng trở thành thần tượng
                                    của một lượng lớn khán giả trẻ 8x và 9x trong suốt những năm thập niên 2000, với hàng loạt hit tiêu biểu như "Thà rằng như thế",
                                    "Mỗi người một nơi", "Anh chỉ biết câm nín nghe tiếng em khóc", "Vì sao trong lòng tôi", "Cắn rứt"...
                                </ReadMore>
                            </p>
                        </div>
                    </BodyTitle>
                </Body>

            </Wrapper>
        </Container>
    );
};

export default DetailSliderGao;
