{-# LANGUAGE DataKinds       #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeOperators   #-}
module Lib
    ( startApp
    ) where

import Data.Aeson
import Data.Aeson.TH
import Network.Wai
import Network.Wai.Handler.Warp
import Servant

data Expression = Expression { body :: String } deriving (Eq, Show)

$(deriveJSON defaultOptions ''Expression)

type API = "addition" :> ReqBody '[JSON] Expression
                      :> Post '[JSON] Expression

startApp :: IO ()
startApp = run 8080 app

app :: Application
app = serve api server

api :: Proxy API
api = Proxy

server :: Server API
server = addition

addition :: Expression -> Handler Expression
addition (Expression body) = return $ Expression (body ++ " you want this?")
