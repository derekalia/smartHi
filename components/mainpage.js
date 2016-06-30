//components/mainpage.js
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TextInput,TouchableOpacity,Navigator,TabBarIOS,} from 'react-native'

//get internal components
import HomeTab       from './hometab.js';

const HomeTabId   = 'HomeTabId';
const SearchTabId = 'SearchTabId';
const ReviewTabId = 'ReviewTabId';
const MapTabId    = 'MapTabId';

const homeIcon = {
  scale: 2.3,
  uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAA58mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMTEgNzkuMTU4MzI1LCAyMDE1LzA5LzEwLTAxOjEwOjIwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNi0wNi0xN1QxNzozNjoxNi0wNTowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE2LTA2LTE3VDE3OjM5OjEzLTA1OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNi0wNi0xN1QxNzozOToxMy0wNTowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDozNzU1YTI4ZS04ZTVjLTRjMzAtYWVhOC1iNmVmN2UwM2E1NzE8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5OWUxOTc5Yy03NTFmLTExNzktOWYxOC04ZjI4ODhmZjZiYjk8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDowYzQ1NjhlNC00YTM0LTRiOWItYTQ4Ni05NzQxNGZhZTY4NGY8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6MGM0NTY4ZTQtNGEzNC00YjliLWE0ODYtOTc0MTRmYWU2ODRmPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE2LTA2LTE3VDE3OjM2OjE2LTA1OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6Mzc1NWEyOGUtOGU1Yy00YzMwLWFlYTgtYjZlZjdlMDNhNTcxPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE2LTA2LTE3VDE3OjM5OjEzLTA1OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+NjQ8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NjQ8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PollYvwAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAA6dJREFUeNrs21uMXXMUx/HPqKlJiBQvbk1KpGOiiZASNCKiqLpFSFA1SFqXF7yIuGuCSh9F4k4pShqSRqtIG3WpRkpIPJRopS4hbpViRkYa28NZE//Z6bTnzDhnn31m/5J5WP85++z9/2btdZv/dGVZZiKrqwJQAagA/Gd0dbXy3pPwHLpxNQZbdeMRey4IwGF4E8eE/RXOxpaJAOBkvI4pufW/cC7e7mQAl+KlxP4RO8MjhnUNlnYigNvwQGJ/jeMxhE3oS353H+7qJACPY2Fif4A5+CPsyViN2clnXsD8sgPoxmsR4Ib1Iq4Y5fNPYEFir4+4MFhGAFOxJon0cD/u3MN1d8QrMKytOAdflgnAKeHSaaRfgKfqvP7y8JQ0Q1yAtWUAMC/e3/E+/K4gLsST7Qzg9nBzSYEzZxzuOzUKpr4GX6NCADyGaxN7Q2z+z3FCnYxVODNZex5XtguAHqzEWU1OYXnA7+E8/F4kgGl4A70tKmLyxdS28LIvigBwarjm/mOM9GPVZVie2EMRZN9qJYD5WJbYg+GOTW9kQidFhjgwWbsuKs6mA7gbixJ7S7jh1hbPMg6NDDEjWVscmahpAPKl6ruYi4GCBjrd8Ro2FIDHAqAnbnRGsrYM/W0y2XoE1+earbnY8X8AOCIi/fRkbRHu1V66BUsS+9towjaPB8BpEWz2Tdb6cwGwnXQJViT23zg/nyHqBdCPZxN7IFrTd7S3TlQbuR2UrN2ARxsBcE/OxVdHmiuTVoRHDGsJbq0HwNNqc7lh/Yqbo7E5uCSb/wmH4KHcMy/HvN0BWIqrcl+2E3srp3b17OuyLJs9GoBNmKmztSPLsimjAZgWAaNnN19wQNKK/pCLukXoopgbwMtqo/bRNISHsyz7Zjyl8KRwLVhn5CS3CK2MZkhE/u3N7gWmJ+3nxhhdFam1SYU6Ex83G0AvPm9TACfgowpABaACUAFoNwA34UYcWeemtsV4a3GnAPgwurRX6gRwcaTaozsJwLF7qDBT/YzfckOYUgN4Px5unzoBbMf3Rg48KwAVgApABaC0ADbiuAaywC/x0zFpcEPUAb11AvgE3xl5vqjUAF6NyU0jqnfYUgoAR2EW9qtz8wNRPG2umqEKQAWgAlABaGMA63F6wQBWqf3VuhAAn6qd6y1Sz6gdmmoZgBn4THtqltrxmKYCOFzt+Ek7qi/xzqYBoDbkvBB7oeh/POzCP2rHYB6s54JRAUxEVQAqABMcwL8DADXdd59Ls8FoAAAAAElFTkSuQmCC'
}

const rateIcon = {
  scale: 2.3,
  uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAwCAYAAAC4wJK5AAAAAXNSR0IArs4c6QAABOJJREFUaAXVmV1oXEUUx7ubTQw2QlKQ5CFoH4RgmhSppU19KNnYBlkQJakRIdJCHxbyRQtWH/ogPpV+aGm+Qz4QAmKiQlVI64ME8UHQUiihtBZSEEQwIoGSZNNsduPvLHvLvdd7b2Y2c9t0YDJf55z5/+fMmZ072bEj5DQwMPDK7OxsLMxpomEa7+/vfzGbzf46Nzd3Osx5QiWxsbHxHrkYAieeZhLH8uBr8cqesIiE5omhoaHdgH7VAo5H3rHqpsvQSKyvr1teyGF+KkkAutW14rXDw8O1rj4jzVA8MTo6Wh2JRA66EabT6TZ3n4l2KCRWV1db8UTEDTCsLRUKCcA64sFGJpQtZZwEv9BVgH7NBtxRZUsZP6WMk+AXugXUQXa3P4mArZTzCON78NbLDvdssRG0YtqmJyYmnudUOryZIt4yekoZJbG0tPQ2K120GQnGjW4poyQA53cqOXiZ3lLGSIyNje0CaZMDbUADIsa8YYxEKpV6C8zKHz/EhTESkb6+PtnHZwjIZwERoS6/tFHauTpF1K9PZEQ2P15BfSdZOaF+A90NZQWXIPqpaDR6KcafDKtyEFuOgLRsW6XoW3V36bKt3MTOfmVhD0H0gZ69HO3s7PyexhvI/OMht2278MIiDnizu7v76qNLmtw8ubhNQ+jQtkWeBwaBW0VFRS0dHR33pesRCWmMjIwUr62tfQqRbmlv0zRZVVWVbGtrS1n4HCSsToL9XepjkCmz+p50yeqnyae7uroG3Fg8SYiQ3G8Imm8gYvSe4wag0gb8X+RjEPjFS973d4KAv0PgHED5Sy/Fx9j3U2lp6T4/AoLD1xN2kGwviRGJFXlDemyJBbxcV1f3YTweXw+aVImEGBgcHGzgBeMrqtVBBg2NLUPgJMfnlIo9ZRJiTK7ay8vLX+CRIyrGC5EB/D1yC9vntqq+FgkxCoEoQf8J5Vmytn4QMMBfraioON7e3v4gSM495hvYbkGrzUTZ8vLyixDIWH2mSmye0yUgc2uTEKXFxcUmCuUbq+gopmZFOYdYQSSwcNRhxVADLxdkt1ASBa2YAtdDxJv2LUGbhLx2s3dfUgCkLYJd+R2K6ypqk8hkMmF5IYedq462fW0SrJb2JDori33tuNAiMT09LV9/TTqgCpCt4ZPgBR09LRILCwv7WSn5llZNf/LxIg8C11UVRI73Wi1va5Fgvyq7muNyKhaL7eU2/DV3oATtU+RVFTK6W1brBwsQzUywGY4HXOG5+nRNWoLoidIVTrYfuUTK3aveGvMqGX+dLC8uWa9xd5/y3Wd8fPy5lZWVfzEux6BnYtKfye9D4A9PATpnZmaemZ+fP0+1B1u+87MND+DF3/zs2PuVPcEjQqMfAYDLp+PHTHqeMnD1EonEQwCc4hvlGrKfY1P+n/G/lD9qlUgox4Tf+Q2Qu+QGVv/cZgTsSImTH0pKSurR+c7eb6srB7evO23GctXe3t67VGrs/QAYrKys/MD+8mAfV61jO4mtz/CKvELmEu00sbUL7y5ZfX6lkify57adwN9MkmA1O7dKQID19PSMEAP7sHnTAipbl9xotYNKJRKc23GbkW/LysrqIXDN1rflKg9hv7O9GiByAWO5uIJEk4phpcAmHuSIlNU/C/hxFcOFyCSTyTR6H3GTvc6c8r6k9OH1H43K5yKOXr0oAAAAAElFTkSuQmCC'
}

const searchIcon = {
  scale: 2.3,
  uri: 'data:image/png;base64,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'
}

const profileIcon = {
  scale: 2.3,
  uri: 'data:image/png;base64,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'
}

const mapIcon = {
  scale: 2.3,
  uri: 'data:image/png;base64,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'
}



class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: HomeTabId
        }
    }

    render() {
        return (
            <TabBarIOS
                unselectedTintColor="grey"
                tintColor="#4A90E2"
                barTintColor="#F9F9F9"
                >
                <TabBarIOS.Item
                    title="Home Tab"
                    icon={homeIcon}
                    selected={this.state.selectedTab == HomeTabId}
                    onPress={()=>{this.setState({selectedTab: HomeTabId})}}>
                    <HomeTab/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Map"
                    icon={mapIcon}
                    selected={this.state.selectedTab == MapTabId}
                    onPress={()=>{this.setState({selectedTab: MapTabId})}}>
                    <View style={[{backgroundColor:'white'}]}>
                        <Text> This is the map tab </Text>
                    </View>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Search"
                    icon={searchIcon}
                    selected={this.state.selectedTab == SearchTabId}
                    onPress={()=>{this.setState({selectedTab: SearchTabId})}}>
                    <View style={[{backgroundColor:'gray'}]}>
                        <Text> This is the search tab </Text>
                    </View>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Review"
                    icon={rateIcon}
                    selected={this.state.selectedTab == ReviewTabId}
                    onPress={()=>{this.setState({selectedTab: ReviewTabId})}}>
                    <View style={[{backgroundColor:'gray'}]}>
                        <Text> This is the review tab </Text>
                    </View>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Profile"
                    icon={profileIcon}
                    >
                    <View style={[{backgroundColor:'gray'}]}>
                        <Text> This is the map tab </Text>
                    </View>
                </TabBarIOS.Item>
            </TabBarIOS>
        )
    }
}

module.exports = MainPage;
