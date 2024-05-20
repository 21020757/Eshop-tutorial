import React from 'react'
import styles from '../../styles/styles'
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";

const ShopPreviewPage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5] w-full`}>
      <ShopProfileData isOwner={false} />
    </div>
  );
}

export default ShopPreviewPage