// Copy pasta the whole file, add it in the TourDetails comp.
// Pass the id={tourId} title={title} path={`/tour/${tourId}`
// These correspond to the way disqus is supposed to differentiate the documents and keep a database of comments for each post.
// https://github.com/kriasoft/react-starter-kit/blob/master/docs/recipes/how-to-integrate-disqus.md

import React from 'react';
import PropTypes from 'prop-types';

function renderDisqus() {
  if (window.DISQUS === undefined) {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://' + process.env.REACT_APP_SHORTNAME + '.disqus.com/embed.js';
    document.getElementsByTagName('head')[0].appendChild(script);
  } else {
    window.DISQUS.reset({ reload: true });
  }
}

class DisqusThread extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return (
      this.props.id !== nextProps?.id ||
      this.props.title !== nextProps?.title ||
      this.props.path !== nextProps?.path
    );
  }

  componentDidMount() {
    renderDisqus();
  }

  componentDidUpdate() {
    renderDisqus();
  }

  render() {
    let { id, title, path, ...other } = this.props;

    if (process.env.BROWSER) {
      window.disqus_shortname = process.env.REACT_APP_SHORTNAME;
      window.disqus_identifier = id;
      window.disqus_title = title;
      window.disqus_url = process.env.REACT_APP_WEBSITE_URL + path;
    }

    return <div {...other} id="disqus_thread" />;
  }
}

export default DisqusThread;
