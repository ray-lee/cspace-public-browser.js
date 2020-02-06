import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import DetailNavBar from './DetailNavBar';
import ImageGallery from './ImageGalleryContainer';
import config from '../../config';
import styles from '../../../styles/cspace/DetailPanel.css';
import categoryStyles from '../../../styles/cspace/DetailCategory.css';
import fieldStyles from '../../../styles/cspace/DetailField.css';

const propTypes = {
  adjacents: PropTypes.shape({
    prev: PropTypes.object,
    next: PropTypes.object,
  }),
  data: PropTypes.shape({
    'collectionspace_core:refName': PropTypes.string,
    'collectionspace_denorm:title': PropTypes.string,
  }),
  error: PropTypes.instanceOf(Error),
  isPending: PropTypes.bool,
  params: PropTypes.instanceOf(Immutable.Map).isRequired,
  readDetail: PropTypes.func,
};

const defaultProps = {
  adjacents: {},
  data: undefined,
  error: undefined,
  isPending: false,
  readDetail: () => undefined,
};

export default class DetailPanel extends Component {
  componentDidMount() {
    this.readDetail();
  }

  componentDidUpdate(prevProps) {
    const {
      params,
    } = this.props;

    const {
      params: prevParams,
    } = prevProps;

    if (params.get('csid') !== prevParams.get('csid')) {
      this.readDetail();
    }
  }

  readDetail() {
    const {
      readDetail,
    } = this.props;

    readDetail();
  }

  renderCategory(id, categoryConfig) {
    const {
      fields,
      label,
      messages,
    } = categoryConfig;

    const title = messages
      // eslint-disable-next-line react/jsx-props-no-spreading
      ? <FormattedMessage {...messages.label} />
      : label;

    const fieldsConfig = config.get('detailFields');

    const renderedFields = fields
      .map((fieldId) => this.renderField(fieldId, fieldsConfig[fieldId]))
      .filter((renderedField) => !!renderedField);

    if (renderedFields.length === 0) {
      return null;
    }

    return (
      <div className={categoryStyles.common} key={id}>
        {title && <h3>{title}</h3>}
        <div>
          {renderedFields}
        </div>
      </div>
    );
  }

  renderField(id, fieldConfig) {
    const {
      data,
    } = this.props;

    const {
      field,
      format,
      label,
      messages,
    } = fieldConfig;

    const title = messages
      // eslint-disable-next-line react/jsx-props-no-spreading
      ? <FormattedMessage {...messages.label} />
      : label;

    const value = data[field];
    const formattedValue = (format && value) ? format(value, id) : value;

    if (!formattedValue) {
      return null;
    }

    if (title) {
      return (
        <React.Fragment key={id}>
          <h4>{title}</h4>
          {formattedValue}
        </React.Fragment>
      );
    }

    return (
      <div className={fieldStyles.unlabeled} key={id}>
        {formattedValue}
      </div>
    );
  }

  renderCategories() {
    const layout = config.get('detailLayout');
    const categoriesConfig = config.get('detailCategories');

    return Object.keys(layout).map((layoutId) => (
      <div id={layoutId} key={layoutId} style={{ gridArea: layoutId }}>
        {layout[layoutId].map((catId) => this.renderCategory(catId, categoriesConfig[catId]))}
      </div>
    ));
  }

  renderDescription() {
    const {
      data,
    } = this.props;

    const descFormatter = config.get('detailDescription');
    const desc = descFormatter && descFormatter(data);

    return (desc && <p>{desc}</p>);
  }

  renderHeader() {
    const {
      adjacents,
      data,
      params,
    } = this.props;

    const titleFormatter = config.get('detailTitle');
    const title = titleFormatter && titleFormatter(data);

    const subtitleFormatter = config.get('detailSubtitle');
    const subtitle = subtitleFormatter && subtitleFormatter(data);

    return (
      <header>
        <DetailNavBar params={params} prev={adjacents.prev} next={adjacents.next} />
        {title && <h1>{title}</h1>}
        {subtitle && <h2>{subtitle}</h2>}
        {/* <SampleIndexContainer materialRefName={refName} /> */}
      </header>
    );
  }

  renderImageGallery() {
    const {
      data,
    } = this.props;

    const {
      'collectionspace_core:refName': refName,
    } = data;

    return (
      <ImageGallery materialRefName={refName} />
    );
  }

  renderPageTitle() {
    const {
      data,
    } = this.props;

    const {
      'collectionspace_denorm:title': title,
    } = data;

    return (
      <Helmet>
        <title>{title}</title>
      </Helmet>
    );
  }

  render() {
    const {
      data,
    } = this.props;

    if (!data) {
      return null;
    }

    return (
      <div className={styles.common}>
        {this.renderPageTitle()}
        {this.renderHeader()}
        {this.renderDescription()}
        {this.renderImageGallery()}
        {this.renderCategories()}
      </div>
    );
  }
}

DetailPanel.propTypes = propTypes;
DetailPanel.defaultProps = defaultProps;
