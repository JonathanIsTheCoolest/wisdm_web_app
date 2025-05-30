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
}

const NotificationCommentContainer: React.FC<NotificationCommentContainerProps> = ({
}) => {
  const searchParams = useSearchParams()
  const sourceId: string = searchParams?.get("source_id") || '';
  const referenceId: string = searchParams?.get("reference_id") || ''; 
  const threadType: string = searchParams?.get("thread") || ''; 

  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)

  useEffect(() => {
    dispatch(updateCurrentChannel({
      current_channel: sourceId
    }))
  }, [sourceId])
  return (
    <div>
      <div
        style={{
          'position': "fixed",
          'width': '100%',
          'height': '50px',
          'backgroundColor': 'var(--color-bg)',
          'borderBottom': '1px solid var(--color-comment-font-detail)',
          'zIndex': '1000'
        }}
      >
        <Link
          href="/dashboard/notifications"
          // className={styles.backButton}
          style={{
            'position': "absolute",
            'top': '50%',
            'left': '20px',
            'transform': 'translateY(-50%)'
          }}
          onClick={() =>
            dispatch(updateCurrentChannel({ current_channel: standardizePersonalRoomName(user.username) }))
          }
        >
          <Image src={arrowLeftBrand} alt="Back" />
        </Link>
      </div>
      <CommentContainer
        threadId={sourceId}
        rootCommentId={referenceId}
        displayMainComment={true}
        threadType={threadType}
      />
    </div>
  )
}

export default NotificationCommentContainer