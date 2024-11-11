type GroupChatType = {
  id: string;
  user_id: number;
  title: string;
  passcode: string;
  created_at: string;
};

type GroupChatUserType = {
  id: number;
  name: string;
  group_id: string;
  created_at: string;
  isOnline?: boolean;
};
type ReplyType = {
  id?:string;
  created_at?:Date;
  chat_id: string;
  replied_by:string;
  message:string;
  type:string;
}
type UpvoteType ={
  chat_id:string;
  upvote:number
}

type MessageType = {
  user_id:number;
  upvote?:number;
  
  message: string;
  group_id: string;
  name: string;
  created_at: string;
};
