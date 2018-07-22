
export class RandomSparklineData {

  private data: any[];
  private min = 0;
  private max = 100;

  init(name: string, min: number, max: number): any[] {

    this.min = min;
    this.max = max;

    return this.data = [{
      'name': name,
      'series': []
    }];
  }

  update(name: string, value: number): any[] {
    const result = [];
    result.push(this.data[0]);
    result[0].series.push(
      {
        name: name,
        value: value
      });
    return result;
  }
}
