import { Button, Card, Col, Container, Row } from "react-bootstrap";
import service1 from "../../../assets/service1.png";
import service2 from "../../../assets/service2.png";
import service3 from "../../../assets/service3.png";
import service4 from "../../../assets/service4.png";

export default function Service() {
  const cards = [
    {
      img: service1,
      title: "Interactive Quizzes",
      text: "Engage users with visually appealing and interactive quiz questions that make learning fun.",
      btn: "Start Quiz",
    },
    {
      img: service2,
      title: "Daily Quiz Challenge",
      text: "Users can attempt one new quiz every day to improve their knowledge and consistency.",
      btn: "Join Challenge",
    },
       {
      img: service4,
      title: "Timed Quiz Battles",
      text: "Test how fast you can think! Answer within the timer to earn bonus points.",
      btn: "Play Now",
    },
    {
      img: service3,
      title: "Topic-Wise Quizzes",
      text: "Choose quizzes based on your interests from history and tech to current affairs.",
      btn: "Explore Topics",
    },
 
  ];

  return (
    <Container fluid className="p-0" style={{ background: "linear-gradient(180deg, #83acf79a 0%, #ffffffff 100%)" }}>

      <div
        className="text-center py-5"
        style={{ height: "400px" }}
      >
        <Container>

          <h2 className="fw-bold mb-4 display-6 text-dark" style={{ marginTop: "80px", fontSize: "45px" }}>Our Services</h2>
          <p className="text-dark  mx-auto w-75 fs-6 lh-lg">
            Our Quiz Website offers interactive quizzes and mock tests to make
            learning fun. Take subject-wise tests, view instant results, and
            track your progress. Teachers can easily create and manage quizzes
            through a secure dashboard.
          </p>

        </Container>

      </div>

      <Container className="my-5 mt-3"   >
        <Row className="g-4 justify-content-center">

          {cards.map((card, index) => (

            <Col xs={12} sm={6} md={4} lg={3} key={index}>
              <Card className="h-100 border-0 shadow-sm text-center ">

                <div className="ratio ratio-4x3 border-bottom">
                  <Card.Img
                    src={card.img}
                    alt={card.title}
                    className="object-fit-cover"
                  />
                </div>

                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title className="fw-semibold mb-2">
                      {card.title}
                    </Card.Title>
                    <Card.Text className="text-muted small">
                      {card.text}
                    </Card.Text>
                  </div>
                  <div className="mt-3">
                    <Button variant="primary" className="px-4">
                      {card.btn}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

      </Container>

    </Container>
  );
}


