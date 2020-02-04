import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import config from '../../config';
import styles from '../../../styles/cspace/DetailPanel.css';
import categoryStyles from '../../../styles/cspace/DetailCategory.css';
import fieldStyles from '../../../styles/cspace/DetailField.css';

const propTypes = {
  data: PropTypes.object,
  error: PropTypes.instanceOf(Error),
  isPending: PropTypes.bool,
  params: PropTypes.instanceOf(Immutable.Map).isRequired,
  readDetail: PropTypes.func,
};

const defaultProps = {
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
      ? <FormattedMessage {...messages.label} />
      : label;

    const fieldsConfig = config.get('detailFields');

    const renderedFields = fields
      .map((fieldId) => this.renderField(fieldId, fieldsConfig[fieldId]))
      .filter((renderedField) => !!renderedField);

    if (renderedFields.length == 0) {
      return null;
    }

    return (
      <div className={categoryStyles.common} key={id}>
        {title && <h3>{title}</h3>}
        {renderedFields}
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
      ? <FormattedMessage {...messages.label} />
      : label;

    const value = data[field];

    let formattedValue = (format && value) ? format(value, id) : value;

    if (!formattedValue) {
      return null;
    }

    const content = title
      ? <>{title}: {formattedValue}</>
      : formattedValue;

    return (
      <div className={fieldStyles.common} key={id}>{content}</div>
    );
  }

  renderCategoryOrField(id) {
    const categoriesConfig = config.get('detailCategories');

    if (id in categoriesConfig) {
      return this.renderCategory(id, categoriesConfig[id]);
    }

    const fieldsConfig = config.get('detailFields');

    if (id in fieldsConfig) {
      return this.renderField(id, fieldsConfig[id]);
    }

    return null;
  }

  renderCategoriesAndFields() {
    const layout = config.get('detailLayout');

    return Object.keys(layout).map((layoutId) => (
      <div id={layoutId} key={layoutId}>
        {layout[layoutId].map((catOrFieldId) => this.renderCategoryOrField(catOrFieldId))}
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
      data,
    } = this.props;

    const titleFormatter = config.get('detailTitle');
    const title = titleFormatter && titleFormatter(data);

    const subtitleFormatter = config.get('detailSubtitle');
    const subtitle = subtitleFormatter && subtitleFormatter(data);

    return (
      <header>
        {/* <DetailNavBar csid={csid} search={search} /> */}
        {title && <h1>{title}</h1>}
        {subtitle && <h2>{subtitle}</h2>}
        {/* <SampleIndexContainer materialRefName={refName} /> */}
      </header>
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
        {this.renderCategoriesAndFields()}
      </div>
    );
  }
}

DetailPanel.propTypes = propTypes;
DetailPanel.defaultProps = defaultProps;
