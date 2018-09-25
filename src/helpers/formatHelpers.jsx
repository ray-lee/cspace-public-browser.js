import React from 'react';
import get from 'lodash/get';
import qs from 'qs';
import { getDisplayName } from 'cspace-refname';

const renderLink = (url, text) =>
  url ? <a href={url}>{text || url}</a> : (text || url);

const renderFilterLink = (filterId, filterValue, linkText) => {
  if (!filterValue) {
    return null;
  }

  const values = [filterValue];
  const query = qs.stringify({ [filterId]: JSON.stringify(values) });

  return renderLink(
    `/material?${query}`,
    typeof linkText === 'undefined' ? filterValue : linkText,
  );
};

const renderJoined = (parts, separator = '') => {
  const nonEmptyParts = parts.filter(
    part => (typeof part !== 'undefined' && part !== null && part !== '')
  );

  if (nonEmptyParts.length === 0) {
    return null;
  }

  return nonEmptyParts.reduce((joinedParts, nextPart) => (
    <React.Fragment>{joinedParts}{separator}{nextPart}</React.Fragment>
  ));
}

const renderList = (values) => {
  if (Array.isArray(values)) {
    if (values.length > 1) {
      return (
        <ul>
          {values.map((value, index) => <li key={index}>{value}</li>)}
        </ul>
      );
    }

    return values[0];
  }

  return values;
};

export const unformatted = data => data;

export const literal = value => () => value;

export const collectionValue = value => value.replace('_', '-');

export const lines = values => values && values.join('\n');

export const list = values => renderList(values);

export const listOf = format => (array, fieldName) =>
  renderList(array.map(value => format(value, fieldName)));

export const displayName = value => (getDisplayName(value) || value);

export const displayNameFrom = name => data => displayName(data[name]);

export const unqualifiedFieldName = (data, fieldName) => {
  const parts = fieldName.split(':');

  return (parts.length > 1 ? parts[1] : parts[0]);
}

export const filterLink = config => (data, fieldName) => {
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
    <React.Fragment>
      {url}{url && note && separator}{note}
    </React.Fragment>
  );
};

export const linkedDisplayName = filterId => data => renderFilterLink(filterId, displayName(data));

export const linkText = (urlField, textField) => (object) =>
  renderLink(object[urlField], object[textField]);

const numberType = {
  callnumber: 'call number',
};

export const numberTypeValue = value => numberType[value] || value;

export const nameValue = config => (data, fieldName) => {
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

export const property = config => (data) => {
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

export const nameRole = config => (data) => {
  const {
    nameFieldName,
    valueFieldName,
    linkName = true,
    separator = ' ',
  } = config;

  const name = displayName(data[nameFieldName]);

  let role = displayName(data[valueFieldName]);

  if (role) {
    role = `(${role})`;
  }

  const parts = [
    linkName ? renderFilterLink(nameFieldName, name) : name,
    role,
  ];

  return renderJoined(parts, separator);
};

export const valueWithNote = config => (data) => {
  const {
    valueFieldName,
    noteFieldName,
    separator = ' - ',
  } = config;

  const value = displayName(data[valueFieldName]);
  const note = data[noteFieldName];

  const parts = [
    renderFilterLink(valueFieldName, value),
    note,
  ];

  return renderJoined(parts, separator);
};

export const numericRange = config => (data) => {
  const {
    linkQualifier,
    lowFieldName,
    highFieldName,
    unit,
    unitFieldName,
    qualifierFieldName,
  } = config;

  const low = data[lowFieldName];
  const high = data[highFieldName];
  const range = [low, high].filter(part => !!part).join('-');

  const qualifier = displayName(data[qualifierFieldName]);

  const parts = [
    range,
    unit ? unit : displayName(data[unitFieldName]),
    linkQualifier ? renderFilterLink(qualifierFieldName, qualifier) : qualifier,
  ];

  return renderJoined(parts, ' ');
};

export const paragraphs = array =>
  array && array.length > 0 && array.map((value, index) => <p key={index}>{value}</p>);

export const composition = (data) => {
  const parts = [
    'materialCompositionFamilyName',
    'materialCompositionClassName',
    'materialCompositionGenericName'
  ].map(fieldName => renderFilterLink(fieldName, displayName(data[fieldName])));

  return renderJoined(parts, ' - ');
};

export const valueAt = config => (data) => {
  const {
    path,
    format = unformatted,
  } = config;

  const value = get(data, path);
  const fieldName = Array.isArray(path) ? path[path.length - 1] : path;

  return format(value, fieldName);
};

