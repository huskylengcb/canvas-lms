/*
 * Copyright (C) 2021 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

const deepLinkingResponseMessageType = 'LtiDeepLinkingResponse'

// Checks to see if a postMessage event is valid for
// deep linking content item processing
// the RCE handles deep linking separately in
// ui/shared/tinymce-external-tools/react/components/ExternalToolDialog.js#handleDeepLinking
export function isValidDeepLinkingEvent(event, env) {
  return !!(
    event.origin === env.DEEP_LINKING_POST_MESSAGE_ORIGIN &&
    event.data?.subject === deepLinkingResponseMessageType &&
    event.data?.placement !== 'editor_button'
  )
}

export const addDeepLinkingListener = cb => {
  window.removeEventListener('message', handleDeepLinking)
  window.addEventListener('message', handleDeepLinking(cb))
}

export const handleDeepLinking = cb => async event => {
  // Don't attempt to process invalid messages
  if (!isValidDeepLinkingEvent(event, ENV)) {
    return
  }

  await cb(event)
}

export const reloadPage = () => {
  window.location.reload()
}
