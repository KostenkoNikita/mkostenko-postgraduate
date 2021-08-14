use neon::prelude::*;

fn api_factorial(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let arg0: f64 = cx.argument::<JsNumber>(0)?.value(&mut cx);

    if arg0 < 0.0 || arg0 > u64::max_value() as f64 {
        panic!("argument {} is out of range", arg0);
    }

    if arg0.fract() > 0.0 {
        panic!("argument {} must be an integer value", arg0);
    }

    let arg0: u64 = arg0 as u64;
    let result = mkostenko_core_rust::common::factorial(arg0);

    return Ok(cx.number(result as f64));
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("factorial", api_factorial)?;
    Ok(())
}