import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List card table. See pages/ViewCardsAdmin.jsx. */

const AccountItem = ({ account }) => (
  <tr>
    <td>{account.username}</td>
    <td>{account._id}</td>
    <td>{account.emails.map((item) => (item.address))}</td>
    <td>{account.createdAt.toLocaleString()}</td>
  </tr>
);

// Require a document to be passed to this component.
AccountItem.propTypes = {
  account: PropTypes.shape({
    username: PropTypes.string,
    _id: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    emails: PropTypes.arrayOf,
  }).isRequired,
};

export default AccountItem;
