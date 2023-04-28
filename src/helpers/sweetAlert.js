import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

export const sweetAlert = {
  onMsg: (type, title = 'Notification', msg) => {
    MySwal.fire({
      icon: type,
      title: title,
      text: msg,
      //footer: '<a href="">Why do I have this issue?</a>',
    });
  },
  onConfirm: (
    callback,
    title = 'Are you sure?',
    text = "You won't be able to revert this!"
  ) => {
    Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  },
};
