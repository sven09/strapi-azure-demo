import React, { memo } from "react";

import { Block, Container } from "./components";

const HomePage = ({ global: { plugins }, history: { push } }) => {
  return (
    <>
      <Container className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Block>
              <h1>HelloSpaces CMS</h1>
              <a href="https://hellospaces.de" target="_blank">https://hellospaces.de</a>
            </Block>
          </div>
        </div>
      </Container>
    </>
  );
};

export default memo(HomePage);
