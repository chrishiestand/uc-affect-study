import Firebase from 'firebase';
import objectAssign from 'object-assign';
import * as FBC from '../constants/Firebase';

export function makeBaseRef(hostname) {
  return new Firebase(`https://${hostname}`);
}

export function buildPath(ref, pathParts){

    if (pathParts.indexOf(null) > -1 || pathParts.indexOf(undefined) > -1 || pathParts.indexOf('') > -1) {
        throw new Error(`firebase path should never contain null, undefined or empty strings: ${pathParts.join('/')}`);
    }

    return ref.child(pathParts.join('/'));
}

export function buildUserRef(ref, userid) {
  return buildPath(ref, [FBC.TOP_LEVEL, FBC.ENV, userid]);
}

export function buildImagesRef(ref, userid) {
  return buildPath(ref, [FBC.TOP_LEVEL, FBC.ENV, userid, 'images']);
}

export async function exportImageInfo_P(ref, userid, ImageInfo) {
  const image_ref = buildImagesRef(ref, userid);
  return image_ref.update(ImageInfo);
}

export async function exportUserInfo_P(ref, userid, UserInfo) {
  const user_ref = buildUserRef(ref, userid);
  return user_ref.update(UserInfo);
}

export function getNumToExport(state) {
  const userInfoExport  = state.userInfoExport;
  const userImageExport = state.userImageExport;
  const numInfoExport   = Object.keys(userInfoExport).length;
  const numImageExport  = Object.keys(userImageExport).length;
  return numInfoExport + numImageExport;
}
