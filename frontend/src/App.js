import './App.css';
import {Routes, Route} from 'react-router-dom';
import * as Homepage from './homepage/layouts';
import * as Portal from './portal/layouts';

function App() {

    return (
        <div className="bg-white font-garet-regular cursor-custom-arrow">
            <Routes>
                {/* Homepage Routes */}
                <Route element={<Homepage.Root/>}>
                    <Route index element={<Homepage.Main/>}/>
                    <Route path="/faq" element={<Homepage.Help/>}/>
                    <Route path="/signup" element={<Homepage.Signup/>}/>
                    <Route path="/login" element={<Homepage.Login/>}/>
                    <Route path="/reset" element={<Homepage.Reset/>}/>
                    <Route path="/about" element={<Homepage.About/>}/>
                </Route>
                {/* User Portal Routes */}
                <Route element={<Portal.Root/>}>
                    <Route path="/dashboard" element={<Portal.Dashboard/>}/>
                    <Route path="/diary" element={<Portal.Diary/>}/>
                    <Route path="/diary/new-entry" element={<Portal.DiaryEntry/>}/>
                    <Route path="/diary/entry/" element={<Portal.DiaryEntryDetails/>}/>
                    <Route path="/diary/entry/edit" element={<Portal.DiaryEntryEdit/>}/>
                    <Route path="/about-ibs" element={<Portal.AboutIbs/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
