import gql from 'graphql-tag';
import apolloClient from './apollo.js';

import {
    SWITCH_TAB,
    SWITCH_SCENE,
    SWITCH_TAB_SCENE,
} from './navigation.js';

export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_ERROR   = 'PROFILE_ERROR';

import {LicenseeSceneId,ProcessorSceneId, ProfileSceneId,HomeTabId,} from '../common/const.js';
import {GetUserProfile} from './data.js';
import {NotifyBusy,NotifyDone} from './navigation.js';

export function GetProfileAction(userId) {
    return ({
        type:SWITCH_SCENE,
        sceneId: ProfileSceneId,
        itemId: userId,
    });
}

export function ResetPasswordAction() {
   return function(dispatch, getState) {
        NotifyBusy(dispatch);
        NotifyDone(dispatch,null);
   }
}

export function AddToProductUser(productId,userId) {
    return async function (dispatch, getState) {

        const addToProductUser = gql`
          mutation addToProductUser($productId:ID!,$userId:ID!) {
              addToProductUser(productsProductId: $productId,usersUserId:$userId) {
                usersUser { 
                    id,
                    name,
                }
              }
         }`;
         try {
            result =  await apolloClient.mutate({mutation:addToProductUser,variables:{productId:productId,userId:userId}});
         }
         catch(error) {
            console.log("AddToProductUser:error");
            console.log(error);
         }
    }
}

export function AddToRetailerUser(retailerId,userId) {
    return async function (dispatch, getState) {

        const addToRetailerUser = gql`
          mutation addToRetailerUser($retailerId:ID!,$userId:ID!) {
              addToRetailerUser(retailersRetailerId: $retailerId,usersUserId:$userId) {
                usersUser { 
                    id,
                    name,
                }
              }
         }`;
         try {
            result =  await apolloClient.mutate({mutation:addToRetailerUser,variables:{retailerId:retailerId,userId:userId}});
         }
         catch(error) {
            console.log("AddToRetailerUser:error");
            console.log(error);
         }
    }
}

export function AddToProducerUser(producerId,userId) {
    return async function (dispatch, getState) {

        const addToProducerUser = gql`
          mutation addToProducerUser($producerId:ID!,$userId:ID!) {
              addToProducerUser(producersProducerId: $producerId,usersUserId:$userId) {
                usersUser { 
                    id,
                    name,
                }
              }
         }`;
         try {
            result =  await apolloClient.mutate({mutation:addToProducerUser,variables:{producerId:producerId,userId:userId}});
         }
         catch(error) {
            console.log("AddToProducerUser:error");
            console.log(error);
         }
    }
}

export function AddToFollowUser(followingUserId,followerUserId) {
    return async function (dispatch, getState) {

        const addToFollow = gql`
          mutation addToFollow($followingUserId:ID!,$followerUserId:ID!) {
              addToFollow(followingUserId: $followingUserId,followerUserId:$followerUserId) {
                followerUser { 
                    id,
                    name,
                }
              }
         }`;
         try {
            result =  await apolloClient.mutate({mutation:addToFollow,variables:{followingUserId:followingUserId,followerUserId:followerUserId}});
         }
         catch(error) {
            console.log("AddToFollowUser:error");
            console.log(error);
         }
    }
}
