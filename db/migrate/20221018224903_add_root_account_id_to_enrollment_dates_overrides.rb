# frozen_string_literal: true

#
# Copyright (C) 2022 - present Instructure, Inc.
#
# This file is part of Canvas.
#
# Canvas is free software: you can redistribute it and/or modify it under
# the terms of the GNU Affero General Public License as published by the Free
# Software Foundation, version 3 of the License.
#
# Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
# WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
# A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
# details.
#
# You should have received a copy of the GNU Affero General Public License along
# with this program. If not, see <http://www.gnu.org/licenses/>.

class AddRootAccountIdToEnrollmentDatesOverrides < ActiveRecord::Migration[6.1]
  include MigrationHelpers::AddColumnAndFk

  tag :predeploy
  disable_ddl_transaction!

  def change
    add_column_and_fk :enrollment_dates_overrides, :root_account_id, :accounts, if_not_exists: true
    add_index :enrollment_dates_overrides, :root_account_id, algorithm: :concurrently, if_not_exists: true
  end
end
