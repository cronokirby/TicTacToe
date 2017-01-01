module AI where

import Data.List
import Data.List.Split

-- Represents a single cell on a board
type Coordinate = (Int, Int)
data Mark = X | O | Empty deriving (Show, Eq)
data Cell = Cell { mark :: Mark, position :: Int} deriving (Show)


makeLines :: [Cell] -> [[Cell]]
makeLines cells = let rows    = chunksOf 3 cells
                      columns = transpose rows
                      diag1   = [head cells, cells !! 4, cells !! 8]
                      diag2   = [cells !! 2, cells !! 4, cells !! 6]
                  in [diag1] ++ [diag2] ++ rows ++ columns

-- Should return true if a line contains 2 Xs
isDangerous :: [Cell] -> Bool
isDangerous line = length (filter (\cell -> mark cell == X ) line) == 2
                && not (any (\cell -> mark cell == O ) line)

-- Returns the position of the cell that needs to be blocked
cellToBlock :: [[Cell]] -> Maybe Int
cellToBlock cellLines = position . head . filter (\e -> mark e == Empty)
                    <$> find isDangerous cellLines

type Turn = Int
type GameState = [Cell]
nextMove :: Turn -> GameState -> Cell -> Cell
nextMove 1 _ lastMove
    | pos `elem` [0, 2, 6, 8] = Cell O 4  --Corner -> place in center
    | pos == 4                = Cell O 0  --Center -> place in corner
    | otherwise               = Cell O 4  --Side -> place in center
    where pos =  position lastMove
nextMove _ cells _ = case cellToBlock $ makeLines cells of
                        Just pos -> Cell O pos
                        Nothing  -> Cell O arbitraryPos
                            where
                              arbitraryPos = position . head
                                $ filter (\e -> mark e == Empty) cells






testGame = [ Cell X 0, Cell O 1, Cell X 2
               , Cell Empty 3, Cell X 4, Cell O 5
               , Cell O 6, Cell X 7, Cell Empty 8]