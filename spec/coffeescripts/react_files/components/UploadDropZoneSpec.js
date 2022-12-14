/*
 * Copyright (C) 2014 - present Instructure, Inc.
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

import React from 'react'
import ReactDOM from 'react-dom'
import {Simulate} from 'react-dom/test-utils'
import UploadDropZone from 'ui/features/files/react/components/UploadDropZone'

const node = document.querySelector('#fixtures')

QUnit.module('UploadDropZone', {
  setup() {
    this.uploadZone = ReactDOM.render(<UploadDropZone />, node)
  },
  teardown() {
    ReactDOM.unmountComponentAtNode(node)
  },
})

test('displays nothing by default', function () {
  const displayText = ReactDOM.findDOMNode(this.uploadZone).innerHTML.trim()
  equal(displayText, '')
})

test('displays dropzone when active', function () {
  this.uploadZone.setState({active: true})
  ok(ReactDOM.findDOMNode(this.uploadZone).querySelector('.UploadDropZone__instructions'))
})

test('handles drop event on target', function () {
  sandbox.stub(this.uploadZone, 'onDrop')
  this.uploadZone.setState({active: true})
  const dataTransfer = {types: ['Files']}
  const n = ReactDOM.findDOMNode(this.uploadZone)
  Simulate.dragEnter(n, {dataTransfer})
  Simulate.dragOver(n, {dataTransfer})
  Simulate.drop(n)
  ok(this.uploadZone.onDrop.calledOnce, 'handles file drops')
})
