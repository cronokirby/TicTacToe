module AI (Cell(..), Winner, nextMove) where

import Data.List
import Data.List.Split

-- Represents a single cell on a board
data Cell = Cell { mark :: String, position :: Int} deriving (Show)
type GameState = [Cell]
type Line = [Cell]
makeLines :: GameState -> [Line]
makeLines cells = let rows    = chunksOf 3 cells
                      columns = transpose rows
                      diag1   = [head cells, cells !! 4, cells !! 8]
                      diag2   = [cells !! 2, cells !! 4, cells !! 6]
                  in [diag1] ++ [diag2] ++ rows ++ columns

-- Should return true if a line contains 2 Xs
isDangerous :: Line -> Bool
isDangerous line = length (filter (\cell -> mark cell == "X" ) line) == 2
                && not (any (\cell -> mark cell == "O" ) line)

-- Returns the position of the cell that needs to be blocked
cellToBlock :: GameState -> Maybe Int
cellToBlock cellLines = position . head . filter (\e -> mark e == "Empty")
                    <$> find isDangerous cellLines

type Turn = Int
nextMove :: Turn -> GameState -> Cell -> Cell
nextMove 2 _ lastMove
    | pos `elem` [0, 2, 6, 8] = Cell "O" 4  --Corner -> place in center
    | pos == 4                = Cell "O" 0  --Center -> place in corner
    | otherwise               = Cell "O" 4  --Side -> place in center
    where pos =  position lastMove
nextMove _ cells _ = case cellToBlock $ makeLines cells of
                        Just pos -> Cell "O" pos
                        Nothing  -> Cell "O" arbitraryPos
                            where
                              arbitraryPos = position . head
                                $ filter (\e -> mark e == "Empty") cells


data Winner = X | O | None deriving (Show, Eq)

isComplete :: Line -> Winner
isComplete line
    | all (\cell -> mark cell == "O") line = O
    | all (\cell -> mark cell == "X") line = X
    | otherwise                            = None

isWinner :: GameState -> Winner
isWinner cells = case filter (!= None) (map isComplete $ makeLines cells) of
                    []        -> None
                    (mark:xs) -> mark
