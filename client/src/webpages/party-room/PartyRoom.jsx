import React from 'react';
import {Box} from '@mui/material';
import {
    CTAButton, CommentField, ProgressBar,
     HeaderBar, MessageBody, VideoPlayer,
     SubmitLinkBody
} from '../../components';
import './PartyRoom.scss';
import { AddBox, ArrowDropDown, PeopleOutlineTwoTone } from '@mui/icons-material';


const PartyRoom = () => {

    const closeRoom = () => {
        console.log("Going back to main room")
    };

    return(
        <Box id="party-room">
            <HeaderBar/>

            <Box className="inner">
                <Box className="video-details-wrapper">
                    <Box className="room-actions">
                        <Box className="participant-wrapper">
                            <h2 className="participant-text">
                                <PeopleOutlineTwoTone/>
                            </h2>
                            <span className="participant-count">5</span>
                            <ArrowDropDown/>
                        </Box>
                        <CTAButton text="Leave Room" buttonFunction={closeRoom}/>
                    </Box>

                    {/* <SubmitLinkBody/> */}

                    <VideoPlayer/>

                    <Box className="video-details">
                        <h2 className="video-name">How To Train Your Dragon</h2>
                        <h3 className="author-title">John Doe</h3>
                    </Box>

                    <CTAButton text="Invite" classname="inverted" component={<AddBox/>}/>
                </Box>
                
                <MessageBody/>
            </Box>
            
        </Box>
        
    )
    
};

export default PartyRoom;