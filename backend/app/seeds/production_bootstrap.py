from app.seeds.constants import DEMO_DATASET_ID


def get_production_bootstrap_placeholder_state() -> dict:
    return {
        "implemented": False,
        "runnable": False,
        "mode": "deployment_time_only_placeholder",
        "datasetId": DEMO_DATASET_ID,
    }


def run_production_bootstrap_placeholder() -> None:
    raise NotImplementedError(
        "Production bootstrap remains internal scaffolding only and is not runnable yet"
    )
