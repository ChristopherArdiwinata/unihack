import React from "react";
import { TypingTest } from "../Components/TypingTest";
import ChatComponent from '../Components/GPTQuiz';
import ImageComponent from "../Components/GPTImage";

export const HomePage = () => {
  return (
    <>
      <div className="card text-center m-5 fullHeightDiv border-primary">
        <div className="card-header">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="typing-tab" data-bs-toggle="tab" data-bs-target="#typing-tab-pane" type="button" role="tab" aria-controls="typing-tab-pane" aria-selected="true">Typing</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false" >Learn Computer Basics</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="ai-tab" data-bs-toggle="tab" data-bs-target="#ai-tab-pane" type="button" role="tab" aria-controls="ai-tab-pane" aria-selected="false">Quiz Time!</button>
            </li>
            <li className="nav-item" role="presentation">
            <button className="nav-link" id="image-tab" data-bs-toggle="tab" data-bs-target="#image-tab-pane" type="button" role="tab" aria-controls="image-tab-pane" aria-selected="false">Generate Image</button>
            </li>
          </ul>
        </div>
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade" id="typing-tab-pane" role="tabpanel" aria-labelledby="typing-tab">
            <TypingTest />
          </div>
          <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab">
            {/* Content for Learn Computer Basics */}
          </div>
          <div className="tab-pane fade show active" id="ai-tab-pane" role="tabpanel" aria-labelledby="ai-tab">
            {/* Integrating ChatComponent here */}
            <ChatComponent />
          </div>
          <div className="tab-pane fade" id="image-tab-pane" role="tabpanel" aria-labelledby="image-tab">
            <ImageComponent />
          </div>
          <div className="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab">in construction</div>
        </div>
      </div>
    </>
  );
}
