{-# LANGUAGE DataKinds       #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeOperators   #-}
module Backend
    ( startApp
    ) where

import Data.Aeson
import Data.Aeson.TH
import Network.Wai
import Network.Wai.Handler.Warp
import Servant

import AI

data GameInput = GameInput { turn :: Int, cells :: [Cell], lastMove :: Cell }
$(deriveJSON defaultOptions ''Cell)
$(deriveJSON defaultOptions ''GameInput)

data GameOutput = GameOutput {winner :: Winner, move :: Cell}
$(deriveJSON defaultOptions ''Winner)
$(deriveJSON defaultOptions ''GameOutput)

type API = "gameinput" :> ReqBody '[JSON] Input :> Post '[JSON] Cell

startApp :: IO ()
startApp = run 8080 app

app :: Application
app = serve api server

api :: Proxy API
api = Proxy

server :: Server API
server = gameinput

gameinput :: GameInput -> Handler Cell
gameinput (GameInput turn cells lastMove) = return $ nextMove turn cells lastMove
