import Disqus from "disqus-react"

import React, { Component } from "react"
import "./Comment.css";

class Comment extends Component {
  render() {
    const disqusShortname = "webproject1yjm"
    const disqusConfig = {
      url: "http://elice-kdt-ai-track-vm-racer-22.koreacentral.cloudapp.azure.com/",
      identifier: "start_comment_page",
      title: "StartPage"
    }

    return (
      <div className="article-container">
        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </div>
    )
  }
}
export default Comment;
