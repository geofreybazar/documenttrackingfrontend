import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import documentService from "../services/documentService";
import userService from "../services/userService";
import AdminSideHome from "./AdminSideHome";
import {
  Dashboard,
  Mydocuments,
  PendingDocuments,
  Sidebar,
  Draft,
  AddDocumentForm,
  Archive,
  Returned,
  EditDocument,
  Search,
  HistoryLogs,
} from "../components";

function Home({
  user,
  setUser,
  isLoading,
  setIsLoading,
  socket,
  setErrorMessage,
  errorMessage,
}) {
  const [openCreateDocumentSuccess, setOpenCreateDocumentSuccess] =
    useState(false);
  const [documents, setDocuments] = useState([]);
  const [pendingdocuments, setPendingdocuments] = useState([]);
  const [returnedDocs, setReturnedDocs] = useState([]);
  const [draftdocuments, setDraftdocuments] = useState([]);
  const [clickeDocument, setClickeDocument] = useState("");
  const [editDocument, setEditDocument] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [getDocuments, setGetDocuments] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [openReceivedSnackBar, setOpenReceivedSnackBar] = useState(false);
  const [openForwardSnackBar, setOpenForwardSnackBar] = useState(false);
  const [toBeReceiveDocs, setToBeReceiveDocs] = useState([]);
  const [toReceiveReturnedDocs, setToReceiveReturnedDocs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const heartbeatInterval = setInterval(() => {
      socket.emit("heartbeat", { timestamp: new Date() });
    }, 10000);

    return () => {
      clearInterval(heartbeatInterval);
      socket.disconnect();
    };
  }, []);

  // start
  useEffect(() => {
    if (socket) {
      // Listen for successful connection
      socket.on("connect", () => {
        console.log("Connected to server");
      });

      // Listen for disconnection
      socket.on("disconnect", (reason) => {
        console.log("Disconnected from server:", reason);
      });

      // Listen for reconnection attempts
      socket.on("reconnect_attempt", (attemptNumber) => {
        console.log("Attempting to reconnect:", attemptNumber);
      });

      // Listen for successful reconnection
      socket.on("reconnect", (attemptNumber) => {
        console.log("Reconnected after", attemptNumber, "attempt(s)");
      });

      // Listen for reconnection error or failure
      socket.on("reconnect_error", (error) => {
        console.error("Reconnection error:", error);
      });

      socket.on("reconnect_failed", () => {
        console.error("Failed to reconnect");
      });
    }
  }, [socket]);
  //end

  useEffect(() => {
    socket.on("getForwardedDraftDocs", (document) => {
      setToBeReceiveDocs((prev) => [...prev, document]);
    });

    socket.on("getForwardedPendingDocs", (document) => {
      setToBeReceiveDocs((docs) => [...docs, document]);
    });

    socket.on("getForwardedReturnedDOcs", (document) => {
      setToReceiveReturnedDocs((docs) => [...docs, document]);
    });
  }, [socket]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    console.log(socket);
    socket.emit("newUser", user.officeId);

    setIsLoading(true);
    documentService
      .getForwardedDocument()
      .then((res) => {
        setDocuments(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setIsLoading(false);
      });

    documentService
      .getDraftDocuments()
      .then((res) => {
        setDraftdocuments(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setIsLoading(false);
      });

    documentService
      .getPendingDOcuments()
      .then((res) => {
        setPendingdocuments(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });

    documentService
      .getReturnedDocuments()
      .then((res) => {
        setReturnedDocs(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setIsLoading(false);
      });

    documentService
      .getDocuments()
      .then((res) => {
        setGetDocuments(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setIsLoading(false);
      });

    userService
      .getAllUsers()
      .then((res) => {
        setAllUsers(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });

    documentService
      .gettoReceiveDocuments()
      .then((res) => {
        setToBeReceiveDocs(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });

    documentService
      .getToReceiveReturnedDocuments()
      .then((res) => {
        setToReceiveReturnedDocs(res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setIsLoading(false);
      });
  }, [socket, user.id]);
  return (
    <div className='bg-gray-50 h-screen flex md:flex-row flex-col transition-height duration-75 ease-out'>
      <div className='hidden md:flex flex-initial'>
        {user && <Sidebar user={user} setUser={setUser} socket={socket} />}
      </div>
      {user.role === "user" ? (
        <div className='pb-2 flex-1 h-lvh border overflow-y-scroll'>
          <Routes>
            <Route
              path='/'
              element={
                <Dashboard
                  documents={documents}
                  draftdocuments={draftdocuments}
                  pendingdocuments={pendingdocuments}
                  returnedDocs={returnedDocs}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  getDocuments={getDocuments}
                  toBeReceiveDocs={toBeReceiveDocs}
                  toReceiveReturnedDocs={toReceiveReturnedDocs}
                  setToReceiveReturnedDocs={setToReceiveReturnedDocs}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />

            <Route
              path='/mydocuments'
              element={
                user && (
                  <Mydocuments
                    documents={documents}
                    setDocuments={setDocuments}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    user={user}
                    clickeDocument={clickeDocument}
                    setClickeDocument={setClickeDocument}
                  />
                )
              }
            />

            <Route
              path='/draftdocuments'
              element={
                user && (
                  <Draft
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    user={user}
                    setOpenCreateDocumentSuccess={setOpenCreateDocumentSuccess}
                    openCreateDocumentSuccess={openCreateDocumentSuccess}
                    clickeDocument={clickeDocument}
                    setClickeDocument={setClickeDocument}
                    draftdocuments={draftdocuments}
                    setDraftdocuments={setDraftdocuments}
                    setDocuments={setDocuments}
                    documents={documents}
                    setEditDocument={setEditDocument}
                    socket={socket}
                  />
                )
              }
            />

            <Route
              path='/pendingdocuments'
              element={
                user && (
                  <PendingDocuments
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    pendingdocuments={pendingdocuments}
                    setPendingdocuments={setPendingdocuments}
                    openReceivedSnackBar={openReceivedSnackBar}
                    setOpenReceivedSnackBar={setOpenReceivedSnackBar}
                    openForwardSnackBar={openForwardSnackBar}
                    setOpenForwardSnackBar={setOpenForwardSnackBar}
                    user={user}
                    toBeReceiveDocs={toBeReceiveDocs}
                    setToBeReceiveDocs={setToBeReceiveDocs}
                    socket={socket}
                  />
                )
              }
            />

            <Route
              path='/addcontact'
              element={
                user && (
                  <AddDocumentForm
                    user={user}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    setOpenCreateDocumentSuccess={setOpenCreateDocumentSuccess}
                    draftdocuments={draftdocuments}
                    setDraftdocuments={setDraftdocuments}
                  />
                )
              }
            />

            <Route
              path='/archivedocuments'
              element={
                user && (
                  <Archive
                    returnedDocs={returnedDocs}
                    setReturnedDocs={setReturnedDocs}
                    documents={documents}
                    setDocuments={setDocuments}
                    clickeDocument={clickeDocument}
                    setClickeDocument={setClickeDocument}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                )
              }
            />

            <Route
              path='/returneddocuments'
              element={
                user && (
                  <Returned
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    user={user}
                    returnedDocs={returnedDocs}
                    setReturnedDocs={setReturnedDocs}
                    setDocuments={setDocuments}
                    documents={documents}
                    editDocument={editDocument}
                    setEditDocument={setEditDocument}
                    clickeDocument={clickeDocument}
                    setClickeDocument={setClickeDocument}
                    openReceivedSnackBar={openReceivedSnackBar}
                    setOpenReceivedSnackBar={setOpenReceivedSnackBar}
                    openForwardSnackBar={openForwardSnackBar}
                    setOpenForwardSnackBar={setOpenForwardSnackBar}
                    toReceiveReturnedDocs={toReceiveReturnedDocs}
                    setToReceiveReturnedDocs={setToReceiveReturnedDocs}
                    socket={socket}
                  />
                )
              }
            />

            <Route
              path='/editDocument'
              element={
                <EditDocument
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  editDocument={editDocument}
                  setDraftdocuments={setDraftdocuments}
                  draftdocuments={draftdocuments}
                  returnedDocs={returnedDocs}
                  setReturnedDocs={setReturnedDocs}
                />
              }
            />

            <Route
              path='/search'
              element={
                <Search
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  allUsers={allUsers}
                  setAllUsers={setAllUsers}
                  clickeDocument={clickeDocument}
                  setClickeDocument={setClickeDocument}
                />
              }
            />

            <Route
              path='/historylogs'
              element={
                <HistoryLogs
                  user={user}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                />
              }
            />
          </Routes>
        </div>
      ) : user.role === "admin" || user.role === "superadmin" ? (
        <div className='p-10 flex-1 h-lvh border overflow-y-scroll'>
          <AdminSideHome user={user} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Home;
