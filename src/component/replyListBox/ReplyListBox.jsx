import SingleReply from './singleReply/SingleReply';
import profileImg from '../../assets/img/canadian-girl.jpg';
import './ReplyListBox.scss';

const ReplyListBox = () => {
  const replies = [
    {
      id: 1,
      img: profileImg,
      username: 'John Doe',
      accountName: '@johndoe',
      postTime: '3小時',
      content:
        'Vestibulum tristique pharetra lorem id eleifend. Maecenas tempus odio vitae ipsum aliquet ullamcorper. Sed varius commodo odio, id dignissim odio iaculis eu.',
      replyTo: '@amanda',
    },
    {
      id: 2,
      img: profileImg,
      username: 'John Doe',
      accountName: '@johndoe',
      postTime: '3小時',
      content:
        'Vestibulum tristique pharetra lorem id eleifend. Maecenas tempus odio vitae ipsum aliquet ullamcorper. Sed varius commodo odio, id dignissim odio iaculis eu.',
      replyTo: '@amanda',
    },
    {
      id: 3,
      img: profileImg,
      username: 'John Doe',
      accountName: '@johndoe',
      postTime: '3小時',
      content:
        'Vestibulum tristique pharetra lorem id eleifend. Maecenas tempus odio vitae ipsum aliquet ullamcorper. Sed varius commodo odio, id dignissim odio iaculis eu.',
      replyTo: '@amanda',
    },
    {
      id: 4,
      img: profileImg,
      username: 'John Doe',
      accountName: '@johndoe',
      postTime: '3小時',
      content:
        'Vestibulum tristique pharetra lorem id eleifend. Maecenas tempus odio vitae ipsum aliquet ullamcorper. Sed varius commodo odio, id dignissim odio iaculis eu.',
      replyTo: '@amanda',
    },
    {
      id: 5,
      img: profileImg,
      username: 'John Doe',
      accountName: '@johndoe',
      postTime: '3小時',
      content:
        'Vestibulum tristique pharetra lorem id eleifend. Maecenas tempus odio vitae ipsum aliquet ullamcorper. Sed varius commodo odio, id dignissim odio iaculis eu.',
      replyTo: '@amanda',
    },
    {
      id: 6,
      img: profileImg,
      username: 'John Doe',
      accountName: '@johndoe',
      postTime: '3小時',
      content:
        'Vestibulum tristique pharetra lorem id eleifend. Maecenas tempus odio vitae ipsum aliquet ullamcorper. Sed varius commodo odio, id dignissim odio iaculis eu.',
      replyTo: '@amanda',
    },
  ];

  return (
    <div className="replyListBox">
      {replies.map((reply) => (
        <SingleReply
          key={reply.id}
          img={reply.img}
          username={reply.username}
          accountName={reply.accountName}
          postTime={reply.postTime}
          content={reply.content}
          replyTo={reply.replyTo}
        />
      ))}
    </div>
  );
};

export default ReplyListBox;
