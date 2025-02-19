'use client'

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux_lib/hooks";
import { updateCurrentChannel } from "@/redux_lib/features/userSlice"; 
import { useSearchParams } from "next/navigation";
import { standardizePersonalRoomName } from "@/app/_lib/user/name/general";

import CommentContainer from "../CommentContainer/CommentContainer";
import Link from "next/link";
import Image from "next/image";

import styles from "@/app/(pages)/dashboard/timeline/Timeline.module.scss";

import arrowLeftBrand from '@/assets/icons/arrow_left_brand.svg';

interface NotificationCommentContainerProps {
  // threadId: string;
}

const NotificationCommentContainer: React.FC<NotificationCommentContainerProps> = ({
  // threadId
}) => {
  const searchParams = useSearchParams()
  const sourceId: string = searchParams?.get("source_id") || '';
  const referenceId: string = searchParams?.get("reference_id") || ''; 

  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)

  useEffect(() => {
    dispatch(updateCurrentChannel({
      current_channel: sourceId
    }))
  }, [sourceId])
  return (
    <div>
      <Link
        href="/dashboard/notifications"
        // className={styles.backButton}
        style={{
          "marginLeft": '20px'
        }}
        onClick={() =>
          dispatch(updateCurrentChannel({ current_channel: standardizePersonalRoomName(user.username) }))
        }
      >
        <Image src={arrowLeftBrand} alt="Back" />
      </Link>
      <CommentContainer
        threadId={sourceId}
        commentThreadRootName={referenceId}
      />
    </div>
  )
}

export default NotificationCommentContainer