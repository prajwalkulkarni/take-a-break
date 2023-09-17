export enum Alarms {
  Water = "WATER",
  Walk = "WALK",
  ScreenBreak = "SCREEN_BREAK",
  WalkAndWater = "WALK_WATER",
  BreakAndWater = "BREAK_WATER",
  BreakAndWaterAndWalk = "BREAK_WATER_WALK",
}

export type MapTask = {
  message: string;
  breaktime: number;
  animation: any;
  weightage: number;
};
