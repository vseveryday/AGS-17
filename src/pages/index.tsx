import Empty from "@/components/Empty";
import GunWindow from "@/components/GunWindow";
import { Row, Col } from "react-bootstrap";

export default function Home() {
  return (
    <>
      {/* <Row>
        <Col xs={6} className="p-5"> */}
      <GunWindow />
      {/* </Col>
        <Col xs={6} className="p-5">
          <Empty />
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="p-5"> */}
      {/* <Empty /> */}
      {/* </Col>
      </Row> */}
    </>
  );
}
