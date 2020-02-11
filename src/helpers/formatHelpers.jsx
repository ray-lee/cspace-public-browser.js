import React from 'react';
import get from 'lodash/get';
import qs from 'qs';
import { Link } from 'react-router-dom';
import { getDisplayName } from 'cspace-refname';
import FieldValueList from '../components/detail/FieldValueList';
import linkStyles from '../../styles/cspace/Link.css';

const renderLink = (url, text, type) => {
  if (!url) {
    return text;
  }

  if (type === 'external') {
    const fullUrl = !url.startsWith('http') ? `http://${url}` : url;

    return <a target="_blank" rel="noopener noreferrer" className={linkStyles[type]} href={fullUrl}>{text || url}</a>;
  }

  return <Link className={type && linkStyles[type]} to={url}>{text || url}</Link>;
};

const renderFilterLink = (filterId, filterValue, linkText) => {
  if (!filterValue) {
    return null;
  }

  const values = [filterValue];
  const query = qs.stringify({ [filterId]: JSON.stringify(values) });

  return renderLink(
    `/search?${query}`,
    typeof linkText === 'undefined' ? filterValue : linkText,
  );
};

export const renderJoined = (parts, separator = '') => {
  const nonEmptyParts = parts.filter(
    (part) => (typeof part !== 'undefined' && part !== null && part !== ''),
  );

  if (nonEmptyParts.length === 0) {
    return null;
  }

  const separatorElement = (separator === '\n') ? <br /> : separator;

  return nonEmptyParts.reduce((joinedParts, nextPart) => (
    // eslint-disable-next-line react/jsx-one-expression-per-line
    <span>{joinedParts}{separatorElement}{nextPart}</span>
  ));
};

const renderList = (values, inline = false) => {
  if (Array.isArray(values)) {
    if (values.length > 1) {
      return (
        <FieldValueList inline={inline}>
          {/* eslint-disable-next-line react/no-array-index-key */}
          {values.map((value, index) => <li key={index}>{value}</li>)}
        </FieldValueList>
      );
    }

    return values[0];
  }

  return values;
};

export const unformatted = (data) => data;

export const literal = (value) => () => value;

export const collectionValue = (value) => value.replace('_', '-');

export const objectTypeValue = (value) => value.replace('_', '-');

export const lines = (values) => values && values.join('\n');

export const list = (values) => renderList(values);

export const inlineList = (values) => renderJoined(values, ', ');

export const listOf = (format) => (array, fieldName) => (
  renderList(array.map((value) => format(value, fieldName)))
);

export const inlineListOf = (format) => (array, fieldName) => (
  renderJoined(array.map((value) => format(value, fieldName)), ', ')
);

export const displayName = (value) => (getDisplayName(value) || value);

export const displayNameFrom = (name) => (data) => displayName(data[name]);

export const unqualifiedFieldName = (data, fieldName) => {
  const parts = fieldName.split(':');

  return (parts.length > 1 ? parts[1] : parts[0]);
};

export const filterLink = (config) => (data, fieldName) => {
  const {
    filterIdFormat = unqualifiedFieldName,
    filterValueFormat = unformatted,
    linkTextFormat,
  } = config;

  const formattedFilterId = filterIdFormat(data, fieldName);
  const formattedFilterValue = filterValueFormat(data, fieldName);

  const formattedLinkText = linkTextFormat
    ? linkTextFormat(data, fieldName)
    : formattedFilterValue;

  return renderFilterLink(
    formattedFilterId,
    formattedFilterValue,
    formattedLinkText,
  );
};

export const linkNote = (urlField, noteField, separator = ' - ') => (object) => {
  const url = renderLink(object[urlField]);
  const note = object[noteField];

  return (
    <>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      {url}{url && note && separator}{note}
    </>
  );
};

export const linkedDisplayName = (filterId) => (data) => (
  renderFilterLink(filterId, displayName(data))
);

export const linkText = (config) => (data) => {
  const {
    urlFieldName,
    textFieldName,
    type,
  } = config;

  return renderLink(data[urlFieldName], data[textFieldName], type);
};

const numberType = {
  callnumber: 'call number',
};

export const numberTypeValue = (value) => numberType[value] || value;

export const nameValue = (config) => (data, fieldName) => {
  const {
    nameFormat,
    valueFormat,
    separator = ': ',
  } = config;

  const formattedName = nameFormat(data, fieldName);
  const formattedValue = valueFormat(data, fieldName);

  const parts = [
    formattedName,
    formattedValue,
  ];

  return renderJoined(parts, separator);
};

export const property = (config) => (data) => {
  const {
    nameFieldName,
    valueFieldName,
    separator = ': ',
  } = config;

  const parts = [
    renderFilterLink(nameFieldName, displayName(data[nameFieldName])),
    data[valueFieldName],
  ];

  return renderJoined(parts, separator);
};

export const nameRole = (config) => (data) => {
  const {
    nameFieldName,
    roleFieldName,
    linkName = true,
    separator = ' ',
  } = config;

  const name = displayName(data[nameFieldName]);

  let role = displayName(data[roleFieldName]);

  if (role) {
    role = `(${role})`;
  }

  const parts = [
    linkName ? renderFilterLink(nameFieldName, name) : name,
    role,
  ];

  return renderJoined(parts, separator);
};

export const valueWithNote = (config) => (data) => {
  const {
    valueFieldName,
    noteFieldName,
    linkValue = true,
    separator = '\n',
    noteLabel = 'Note: ',
  } = config;

  const value = displayName(data[valueFieldName]);

  let note = data[noteFieldName];

  if (note) {
    note = `${noteLabel}${note}`;
  }

  const parts = [
    linkValue ? renderFilterLink(valueFieldName, value) : value,
    note,
  ];

  return renderJoined(parts, separator);
};

export const numericRange = (config) => (data) => {
  const {
    linkQualifier,
    lowFieldName,
    highFieldName,
    unitFieldName,
    qualifierFieldName,
    qualifierSeparator = ' ',
  } = config;

  let {
    unit,
  } = config;

  const low = data[lowFieldName];
  const high = data[highFieldName];
  const range = [low, high].filter((part) => !!part).join('-');

  if (range) {
    unit = unit || displayName(data[unitFieldName]);
  } else {
    unit = null;
  }

  const qualifier = displayName(data[qualifierFieldName]);
  const rangeUnit = renderJoined([range, unit], ' ');

  return renderJoined([
    rangeUnit,
    linkQualifier ? renderFilterLink(qualifierFieldName, qualifier) : qualifier,
  ], qualifierSeparator);
};

export const paragraphs = (array) => (
  // eslint-disable-next-line react/no-array-index-key
  array && array.length > 0 && array.map((value, index) => <p key={index}>{value}</p>)
);

export const composition = (data) => {
  const parts = [
    'materialCompositionFamilyName',
    'materialCompositionClassName',
    'materialCompositionGenericName',
  ].map((fieldName) => renderFilterLink(fieldName, displayName(data[fieldName])));

  return renderJoined(parts, ' - ');
};

export const valueAt = (config) => (data) => {
  const {
    path,
    format = unformatted,
  } = config;

  const value = get(data, path);
  const fieldName = Array.isArray(path) ? path[path.length - 1] : path;

  return format(value, fieldName);
};

export const pickFromList = (config) => (array) => {
  const {
    condition,
    format,
  } = config;

  const {
    path,
    value: targetValue,
  } = condition;

  const value = array.find((candidateItem) => {
    const candidateValue = path ? get(candidateItem, path) : candidateItem;

    return (candidateValue === targetValue);
  });

  return (format ? format(value) : value);
};

export const pickAllFromList = (config) => (array) => {
  const {
    condition,
    format,
  } = config;

  const {
    path,
    value: targetValue,
  } = condition;

  const values = array.filter((candidateItem) => {
    const candidateValue = path ? get(candidateItem, path) : candidateItem;

    return (candidateValue === targetValue);
  });

  return renderJoined((format ? values.map(format) : values), '\n');
};
