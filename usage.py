import dash_materialsintelligence as dmi
import dash
import dash_html_components as html
from dash.dependencies import Input, Output, State
import dash_core_components as dcc
import pprint

app = dash.Dash('')

app.css.append_css({"external_url": "https://codepen.io/chriddyp/pen/bWLwgP.css"})
app.config.suppress_callback_exceptions = True

app.scripts.config.serve_locally = True

testTokens = [[{'text': 'ab', 'start': 1, 'end': 3},
              {'text': 'cd', 'start': 4, 'end': 6},
              {'text': 'ef', 'start': 7, 'end': 9},
              {'text': '.', 'start': 9, 'end': 10},
              {'text': 'gf', 'start': 11, 'end': 13}],
              [{'text': 'AB', 'start': 1, 'end': 3},
              {'text': 'CD', 'start': 4, 'end': 6},
              {'text': 'EF', 'start': 7, 'end': 9},
              {'text': '.', 'start': 9, 'end': 10},
              {'text': 'GF', 'start': 11, 'end': 13}]]

annotations = [[{'id': 'token-0-2', 'annotation': None},
               {'id': 'token-3-5', 'annotation': 'material'},
               {'id': 'token-6-8', 'annotation': None},
               {'id': 'token-8-9', 'annotation': 'inorganic_crystal'},
               {'id': 'token-10-12', 'annotation': None}],
               [{'id': 'token-0-2', 'annotation': 'main_material'},
               {'id': 'token-3-5', 'annotation': None},
               {'id': 'token-6-8', 'annotation': None},
               {'id': 'token-8-9', 'annotation': None},
               {'id': 'token-10-12', 'annotation': None}]]

testLabels = [{'text': 'Material', 'value': 'material'},
              {'text': 'Inorganic Crystal', 'value': 'inorganic_crystal'},
              {'text': 'Main Material', 'value': 'main_material'}]

app.layout = html.Div([
    dmi.AnnotationContainer(
        doi="test",
        tokens=testTokens,
        annotations=annotations,
        className="testClass",
        id="annotation_container",
        labels=testLabels,
        selectedValue=testLabels[1]["value"]
    ),
    dmi.DropdownCreatable(
        options=[
            {'value': 'R', 'label': 'Red'},
            {'value': 'G', 'label': 'Green'},
            {'value': 'B', 'label': 'Blue'}],
        multi=True,
        id="tags_selector",
        value=None,
    ),
    html.Div("nothing so far", id="test_output"),
    html.Div(html.Button("Confirm", id="annotate_confirm"))
])

# @app.callback(
#     dash.dependencies.Output('output', 'children'),
#     [dash.dependencies.Input('input', 'value')])
# def display_output(value):
#     return 'You have clicked {} times'.format(value)


"""
Annotation App Callbacks
"""
@app.callback(
    Output('test_output', 'children'),
    [Input('annotate_confirm', 'n_clicks')],
    [State('annotation_container', 'annotations'),
     State('tags_selector', 'value')])
def load_next_abstract(
        n_clicks,
        annotations,
        tags):
    pprint.pprint("here")
    if n_clicks is not None:
        pprint.pprint(annotations)
        pprint.pprint(tags)
        # do something to record the annotation
    return html.Div("annotations confirmed")


if __name__ == '__main__':
    app.run_server(debug=True)

