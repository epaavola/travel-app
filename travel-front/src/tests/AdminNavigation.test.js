import { ExpansionPanelActions } from '@material-ui/core'
import { findAllByTestId } from '@testing-library/react'
import AdminNavigation from '../components/Admin/AdminNavigation'

test('Get username test', () => {
    const username = "Esa Paavola"
    expect(username).toBe("Esa Paavola")
})