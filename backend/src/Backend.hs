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

data Input = Input { turn :: Int, cells :: [Cell], lastMove :: Cell }
$(deriveJSON defaultOptions ''Cell)
$(deriveJSON defaultOptions ''Input)

data Expression = Expression { body :: String } deriving (Eq, Show)
$(deriveJSON defaultOptions ''Expression)

type API = "addition"  :> ReqBody '[JSON] Expression :> Post '[JSON] Expression
      :<|> "gameinput" :> ReqBody '[JSON] Input :> Post '[JSON] Cell

startApp :: IO ()
startApp = run 8080 app

app :: Application
app = serve api server

api :: Proxy API
api = Proxy

server :: Server API
server = addition
    :<|> gameInput

{-testGameState :: [Cell]
testGameState = [ Cell "X" 0, Cell "O" 1, Cell "X" 2
                , Cell "Empty" 3, Cell "X" 4, Cell "O" 5
                , Cell "O" 6, Cell "X" 7, Cell "Empty" 8]-}

gameInput :: Input -> Handler Cell
gameInput (Input turn cells lastMove) = return $ nextMove turn cells lastMove

addition :: Expression -> Handler Expression
addition (Expression body) = return $ Expression (body ++ " you want this?")
