import React, { useEffect, useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { postPublic } from "../../services/apiService";

export const NewsAccordion = ({ user }) => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await postPublic(`/news/platformNews`, { listaCurso });
      setNewsList(res.data);
    };
    const listaCurso = user?.moodleUserData.listaCurso.map((c) => {
      return c.idCurso;
    });

    fetchNews();
  }, []);

  return (
    <>
      {newsList.length !== 0 && (
        <Accordion className="acordion-quark">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Novedades{" "}
              <span className="badge rounded-pill text-bg-secondary">
                {newsList.length}
              </span>{" "}
            </Accordion.Header>
            <Accordion.Body>
              {newsList.map((news) => {
                return (
                  <Card className="card-quark">
                    <Card.Header>{news.title}</Card.Header>
                    <Card.Body>{news.content}</Card.Body>
                  </Card>
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </>
  );
};
