import { connect } from 'react-redux';
import Modal from '../components/Modal';
import { closeModal } from '../actions/modal';
import { isModalOpen } from '../reducers';

const mapStateToProps = (state, ownProps) => ({
  isOpen: isModalOpen(state, ownProps.id),
});

const mapDispatchToProps = {
  closeModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal);
